import { useComments } from "./useComments";

import Comments from "./Comments";
import { useAuth } from "../../contexts/fakeAuthContext";
import NewCommentForm from "./NewCommentForm";
import Spinner from "../../ui/Spinner";

function CommentsTable() {
  // 1) Llamamos a todos los comments ya ordenados por fecha
  const { isLoading, comments } = useComments();

  const { userLogged } = useAuth(); // The logged user (juliusumo)

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  console.log(comments);

  return (
    <ul role="item" className=" flex flex-col py-7 max-w-[830px] gap-4">
      {comments.map((comment) => (
        // 2) adentro de Comments llamamos a RepliesTable, para cada comentario
        <Comments
          key={comment.id}
          comment={comment}
          userLoggedId={userLogged.id}
        ></Comments>
      ))}

      <NewCommentForm userLogged={userLogged} />
    </ul>
  );
}

export default CommentsTable;
