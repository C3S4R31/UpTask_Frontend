import { addUserToProject } from "@/api/teamAPI"
import type { TeamMember } from "@/types/index"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"

type SearchResultProps = {
    user: TeamMember
    reset: () => void
}

export default function SearchResult({ user, reset }: SearchResultProps) {

    const navigate = useNavigate()
    const params = useParams()
    const projectId = params.projectId!

    const queryClient = useQueryClient()

    const { mutate } = useMutation({
        mutationFn: addUserToProject,
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: (response) => {
            toast.success(response)
            reset()  
            navigate(location.pathname, {replace: true})
            queryClient.invalidateQueries({queryKey: ['projectTeam', projectId]})        
        }
    })

    const handleAddUserToProject = () => {
        const data = {
            projectId,
            id: user._id
        }
        mutate(data)
    }

  return (
    <>
        <p className="mt-10 text-center font-bold">Resultado:</p>
        <div className="flex justify-between items-center">
            <p>{user.name}</p>
            <button
                onClick={handleAddUserToProject}
                className="text-purple-600 hover:bg-purple-100 px-10 py-3 font-bold cursor-pointer"
            >Agregar al Proyecto</button>
        </div>
    </>
  )
}
