import {
  createAutomations,
  deleteKeyword,
  saveKeyword,
  saveListener,
  savePosts,
  saveTrigger,
  updateAutomationName,
} from "@/actions/automations";
import { useMutationData } from "./use-mutation-data";
import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import useZodForm from "./use-zod-form";
import { AppDispatch, useAppSelector } from "@/redux/store";
import { useDispatch } from "react-redux";
import { TRIGGER } from "@/redux/slices/automation";

// This hook handles the creation of a new automation using a mutation.
// It uses React Query's `useMutationData` to execute the `createAutomations` function and update the "user-automations" cache.
export const useCreateAutomation = (id?: string) => {
  const { mutate, isPending } = useMutationData(
    ["create-automation"],
    () => createAutomations(id),
    "user-automations"
  );

  return { mutate, isPending };
};

// This hook manages the editing of an automation's name.
// It provides state and methods for enabling/disabling edit mode, tracks the input reference, and updates the automation name using a mutation. It also includes an effect to handle clicks outside the input to trigger updates.
export const useEditAutomation = (automationId: string) => {
  const [edit, setEdit] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const enableEdit = () => setEdit(true);
  const disableEdit = () => setEdit(false);

  const { isPending, mutate } = useMutationData(
    ["update-automation"],
    (data: { name: string }) =>
      updateAutomationName(automationId, { name: data.name }),
    "automation-info",
    disableEdit
  );

  useEffect(() => {
    function handleClickOutside(this: Document, event: MouseEvent) {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node | null)
      ) {
        if (inputRef.current.value !== "") {
          mutate({ name: inputRef.current.value });
        } else {
          disableEdit();
        }
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return {
    edit,
    enableEdit,
    disableEdit,
    inputRef,
    isPending,
  };
};

// This hook manages the creation and configuration of a listener for an automation.
// It tracks the selected listener type ("MESSAGE" or "SMARTAI"), handles form validation using Zod, and provides a mutation for saving the listener.
export const useListener = (id: string) => {
  const [listener, setListener] = useState<"MESSAGE" | "SMARTAI" | null>(null);

  const promptSchema = z.object({
    prompt: z.string().min(1),
    reply: z.string(),
  });

  const { isPending, mutate } = useMutationData(
    ["create-lister"],
    (data: { prompt: string; reply: string }) =>
      saveListener(id, listener || "MESSAGE", data.prompt, data.reply),
    "automation-info"
  );

  const { errors, onFormSubmit, register, reset, watch } = useZodForm(
    promptSchema,
    mutate
  );

  const onSetListener = (type: "SMARTAI" | "MESSAGE") => setListener(type);
  return { onSetListener, register, onFormSubmit, listener, isPending };
};

// This hook manages triggers for an automation.
// It allows setting a trigger type (either "COMMENT" or "DM"), saves the trigger configuration using a mutation, and handles state updates through Redux for trigger types.
export const useTriggers = (id: string) => {
  const types = useAppSelector(
    (state) => state.AutmationReducer.trigger?.types
  );

  const dispatch: AppDispatch = useDispatch();

  const onSetTrigger = (type: "COMMENT" | "DM") =>
    dispatch(TRIGGER({ trigger: { type } }));

  const { isPending, mutate } = useMutationData(
    ["add-trigger"],
    (data: { types: string[] }) => saveTrigger(id, data.types),
    "automation-info"
  );

  const onSaveTrigger = () => mutate({ types });
  return { types, onSetTrigger, onSaveTrigger, isPending };
};

// This hook handles adding and deleting keywords for an automation.
// It manages keyword input state, allows users to add a keyword on pressing "Enter", and provides mutation functions for saving and deleting keywords in the automation's configuration.
export const useKeywords = (id: string) => {
  const [keyword, setKeyword] = useState("");
  const onValueChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setKeyword(e.target.value);

  const { mutate } = useMutationData(
    ["add-keyword"],
    (data: { keyword: string }) => saveKeyword(id, data.keyword),
    "automation-info",
    () => setKeyword("")
  );

  const onKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      mutate({ keyword });
      setKeyword("");
    }
  };

  const { mutate: deleteMutation } = useMutationData(
    ["delete-keyword"],
    (data: { id: string }) => deleteKeyword(data.id),
    "automation-info"
  );

  return { keyword, onValueChange, onKeyPress, deleteMutation };
};

// This hook manages a list of selected posts for an automation.
// It allows posts to be toggled for selection, tracks the selected posts in the state, and provides a mutation to save the selected posts. It also resets the list after saving the posts.
export const useAutomationPosts = (id: string) => {
  const [posts, setPosts] = useState<
    {
      postId: string;
      caption?: string;
      media: string;
      mediaType: "IMAGE" | "VIDEO" | "ALBUM";
    }[]
  >([]);

  const onSelectPost = (post: {
    postId: string;
    caption?: string;
    media: string;
    mediaType: "IMAGE" | "VIDEO" | "ALBUM";
  }) => {
    setPosts((prevItems) => {
      if (prevItems.find((p) => p.postId === post.postId)) {
        return prevItems.filter((item) => item.postId !== post.postId);
      } else {
        return [...prevItems, post];
      }
    });
  };
  const { mutate, isPending } = useMutationData(
    ["attach-posts"],
    () => savePosts(id, posts),
    "automation-info",
    () => setPosts([])
  );
  return { posts, onSelectPost, mutate, isPending };
};
