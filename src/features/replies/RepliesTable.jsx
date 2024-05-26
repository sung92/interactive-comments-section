import { useReply } from "./useReply";
import Replies from "./Replies";
import PropTypes from "prop-types";
import Spinner from "../../ui/Spinner";

function RepliesTable({ commentId, userLoggedId }) {
  const { isLoading, error, replies } = useReply(commentId);

  if (isLoading)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading replies</div>;

  if (replies.length == 0) return;

  return (
    <ul className="first:mt-4 flex flex-col gap-4 last:mb-4 pl-5 border-l-4 border-neutral-lightgray">
      {replies.map((reply) => (
        <Replies key={reply.id} reply={reply} userLoggedId={userLoggedId} />
      ))}
    </ul>
  );
}

RepliesTable.propTypes = {
  commentId: PropTypes.number.isRequired,
  userLoggedId: PropTypes.number.isRequired,
};

export default RepliesTable;
