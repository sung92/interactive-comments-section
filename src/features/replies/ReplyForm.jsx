import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useCreateReply } from "./useCreateReply";
import { useAuth } from "../../contexts/fakeAuthContext";

function ReplyForm({ commentId, onCancel }) {
  const { register, handleSubmit, reset } = useForm();
  const { isLoading, createReply } = useCreateReply();
  const { userLogged } = useAuth(); // The logged user (juliusumo)

  const onSubmit = (data) => {
    if (!data.text.trim()) return;

    createReply(
      { user: userLogged.id, text: data.text, comment: commentId },
      {
        onSuccess: () => {
          reset();
          onCancel();
        },
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="mt-2 bg-white rounded-lg p-5 grid grid-rows-mobileReply grid-cols-mobile gap-y-2"
    >
      <div className="flex gap-4 items-start col-span-full">
        <img
          className="w-[32px] h-[32px] rounded-full"
          src={`${userLogged.image}`}
          alt="user's avatar"
        />
        <textarea
          placeholder="Add a reply..."
          className="w-full border-primary-moderateblue border-[1px] rounded-lg p-4 h-[100px]"
          disabled={isLoading}
          {...register("text", { required: true })}
        />
      </div>
      <div className="ml-12 mt-2 flex justify-end gap-4">
        <button
          type="button"
          className="py-4 px-8 rounded-lg uppercase bg-primary-softred"
          onClick={onCancel}
        >
          <p className="font-bold text-white">Cancel</p>
        </button>
        <button
          type="submit"
          className="py-4 px-8 rounded-lg bg-primary-moderateblue uppercase"
          disabled={isLoading}
        >
          <p className="font-bold text-white">
            {isLoading ? "Replying..." : "Reply"}
          </p>
        </button>
      </div>
    </form>
  );
}

ReplyForm.propTypes = {
  commentId: PropTypes.number.isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default ReplyForm;
