import { useQuery } from '@tanstack/react-query'
import { getAllAutomations, getAutomationInfo, getProfilePosts } from "@/actions/automations"
import { onUserInfo } from '@/actions/user'

// This hook uses ReactQuery to fetch and cache all user automations.
export const useQueryAutomations = () => {
    return useQuery({
      queryKey: ['user-automations'],
      queryFn: getAllAutomations,
    })
}

// This hook fetches and caches information about a specific automation identified by its ID. 
export const useQueryAutomation = (id: string) => {
    return useQuery({
      queryKey: ['automation-info'],
      queryFn: () => getAutomationInfo(id), 
    })
}

// This hook fetches and caches the current user's profile data using React Query. 
export const useQueryUser = () => {
  return useQuery({
    queryKey: ['user-profile'],
    queryFn: onUserInfo,
  })
}

// This hook fetches and caches Instagram media posts associated with a user profile.
export const useQueryAutomationPosts = () => {
  const fetchPosts = async () => await getProfilePosts()
  return useQuery({
    queryKey: ['instagram-media'],
    queryFn: fetchPosts,
  })
}
