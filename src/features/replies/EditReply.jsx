import { useForm } from "react-hook-form";
import { useEditReply } from "../replies/useEditReply";
import PropTypes from "prop-types";

function EditReply({ reply, onCancel }) {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: reply.text },
  });
  const { isLoading, editReply } = useEditReply();

  const onSubmit = (data) => {
    if (!data.text.trim()) return;

    editReply(
      { id: reply.id, text: data.text },
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
      className="col-span-full row-start-3"
    >
      <textarea
        className="w-full border-primary-moderateblue border-[1px] rounded-lg p-4 h-[100px]"
        placeholder="Edit your reply..."
        disabled={isLoading}
        {...register("text", { required: true })}
      />
      <div className="mt-4 flex gap-5 mr-auto">
        <button
          className="py-4 px-8 rounded-lg uppercase bg-primary-softred"
          type="button"
          onClick={onCancel}
        >
          <p className="font-bold text-white">Cancel</p>
        </button>
        <button
          className="py-4 px-8 rounded-lg bg-primary-moderateblue uppercase"
          type="submit"
          disabled={isLoading}
        >
          <p className="font-bold text-white">
            {isLoading ? "Saving..." : "Update"}
          </p>
        </button>
      </div>
    </form>
  );
}

EditReply.propTypes = {
  reply: PropTypes.shape({
    id: PropTypes.number.isRequired,
    text: PropTypes.string.isRequired,
  }).isRequired,
  onCancel: PropTypes.func.isRequired,
};

export default EditReply;
