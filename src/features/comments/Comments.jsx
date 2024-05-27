import RepliesTable from "../replies/RepliesTable";
import { useUser } from "../users/useUser";
import { useDeleteComments } from "./useDeleteComments";
import { PropTypes } from "prop-types";
import calculateTime from "../utils/calculateTime";
import { useUpvote } from "../votes/useUpvote";
import { useDownvote } from "../votes/useDownvote";
import { useVoteStatus } from "../votes/useVoteStatus";
import EditComment from "./EditComment";
import { useState } from "react";
import ReplyForm from "../replies/ReplyForm";
import Spinner from "../../ui/Spinner";
import { debounce } from "../utils/debounce";

function Comments({ comment, userLoggedId }) {
  const { isLoading: isLoadingDelete, deleteComment } = useDeleteComments();
  const { isLoading, error, user } = useUser(comment.user);
  const [isEditing, setIsEditing] = useState(false);
  const [isReplying, setIsReplying] = useState(false); // State for managing reply form visibility

  const upvote = useUpvote(comment.id, userLoggedId);
  const downvote = useDownvote(comment.id, userLoggedId);
  const { data: voteStatus, isLoading: isLoadingVoteStatus } = useVoteStatus(
    comment.id,
    userLoggedId
  );

  const commentCreatedAt = calculateTime(comment.created_at);

  const handleUpvote = debounce(() => {
    upvote.mutate();
  }, 300);

  const handleDownvote = debounce(() => {
    downvote.mutate();
  }, 300);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
  };

  const handleReplyClick = () => {
    setIsReplying(true);
  };

  const handleCancelReply = () => {
    setIsReplying(false);
  };

  if (isLoading || isLoadingVoteStatus)
    return (
      <div>
        <Spinner />
      </div>
    );
  if (error) return <div>Error loading user</div>;

  console.log(comment.id);

  return (
    <li className="">
      <div
        className={` bg-white rounded-lg p-5 pb-12 grid ${!isEditing ? "grid-rows-mobile" : "grid-rows-mobileEdit"} grid-cols-mobile gap-y-2 desktop:grid-cols-desktop`}
      >
        <div
          className={`flex items-center gap-4  desktop:self-start ${isEditing ? "desktop:col-start-1 desktop:col-span-2" : "desktop:col-start-3"}`}
        >
          {user && (
            <>
              <img
                className="w-[32px] h-[32px]"
                src={`${user.image}`}
                alt="user's avatar"
              />
              <div className="flex gap-2">
                <p className=" text-neutral-darkblue font-bold">{user.name} </p>
                {userLoggedId === user.id && (
                  <div className="bg-primary-moderateblue py-[2px] px-2 rounded-md">
                    <p className=" font-medium text-white">you</p>{" "}
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        <span className=" text-neutral-grayishblue col-start-3 self-center desktop:col-start-5">
          {commentCreatedAt}
        </span>

        {isEditing ? (
          <EditComment comment={comment} onCancel={handleCancelEdit} />
        ) : (
          <p className="text-neutral-grayishblue col-span-full row-start-3 desktop:col-start-3">
            {comment.text}
          </p>
        )}

        {!isEditing && (
          <div className=" bg-neutral-verylgray flex justify-around py-1 px-3 rounded-lg w-[100px] h-[50px] items-center row-start-5 self-center desktop:row-start-1 desktop:col-start-1 desktop:flex-col desktop:w-[50px] desktop:h-[100px] desktop:row-span-3 desktop:self-start">
            <button onClick={handleUpvote}>
              <p
                className={`font-bold text-[25px] ${voteStatus === 1 ? "text-tomato" : "text-primary-lightgrayishblue"}`}
              >
                +
              </p>
            </button>

            <p className=" text-primary-moderateblue font-bold text-[18px]">
              {comment.votes}
            </p>
            <button onClick={handleDownvote}>
              <p
                className={`font-bold text-[25px] ${voteStatus === -1 ? "text-primary-moderateblue" : "text-primary-lightgrayishblue"}`}
              >
                -
              </p>
            </button>
          </div>
        )}

        {!isEditing && (
          <div className="flex justify-between items-center justify-self-end row-start-5 col-start-3 desktop:col-start-7 desktop:row-start-1">
            {userLoggedId === user.id && !isEditing ? (
              <div className="flex items-center gap-4 justify-center">
                <button
                  onClick={() => deleteComment(comment.id)}
                  disabled={isLoadingDelete}
                  className="flex items-center gap-2"
                >
                  <img src="/images/icon-delete.svg" />
                  <p className="font-bold text-primary-softred">Delete</p>
                </button>
                <button
                  onClick={handleEditClick}
                  className="flex items-center gap-2"
                >
                  <img src="/images/icon-edit.svg" />
                  <p className="font-bold text-primary-moderateblue">Edit</p>
                </button>
              </div>
            ) : !isEditing ? (
              <button
                onClick={handleReplyClick}
                className="flex items-center gap-2"
              >
                <img src="/images/icon-reply.svg" />
                <p className="font-bold text-primary-moderateblue">Reply</p>
              </button>
            ) : (
              ""
            )}
          </div>
        )}
      </div>

      {isReplying && (
        <ReplyForm commentId={comment.id} onCancel={handleCancelReply} />
      )}

      {/* 2) Render the replies table, if there are any */}
      <div className="">
        <RepliesTable commentId={comment.id} userLoggedId={userLoggedId} />
      </div>
    </li>
  );
}

Comments.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    user: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
    created_at: PropTypes.string.isRequired,
    votes: PropTypes.number.isRequired,
  }).isRequired,
  userLoggedId: PropTypes.number.isRequired,
};

export default Comments;
