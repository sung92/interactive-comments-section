import { useForm } from "react-hook-form";
import { useAddComment } from "./useAddComment";
import PropTypes from "prop-types";

function NewCommentForm({ userLogged }) {
  const { isLoading, addNewComment } = useAddComment();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    if (!data.comment.trim()) return;

    addNewComment(
      { user: userLogged.id, text: data.comment },
      {
        onSuccess: () => {
          reset();
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className=" bg-white rounded-lg p-5 flex flex-col gap-4">
        <label>
          <textarea
            className=" w-full h-[100px] p-4 border-[1px] border-neutral-lightgray rounded-lg text-neutral-darkblue focus:outline-primary-moderateblue focus:outline-none focus:shadow-sm focus:border-none"
            type="text"
            placeholder="Add a comment..."
            {...register("comment", { required: true })}
          ></textarea>
        </label>

        <div className="flex justify-between items-center">
          <img
            className="w-[48px] h-[48px] "
            src={`${userLogged?.image}`}
            alt="user's avatar"
          />
          <button className="py-4 px-8 rounded-lg bg-primary-moderateblue uppercase">
            <p className="font-bold text-white">Send</p>
          </button>
        </div>
      </div>
    </form>
  );
}

NewCommentForm.propTypes = {
  userLogged: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
  }).isRequired,
};

export default NewCommentForm;
