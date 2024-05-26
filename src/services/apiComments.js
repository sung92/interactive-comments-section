import supabase from "./supabase";

export async function getComments() {
  let { data: comments, error } = await supabase
    .from("comments")
    .select("*")
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Comments could not be loaded");
  }

  return comments;
}

export async function addComment({ user, text }) {
  const { data, error } = await supabase
    .from("comments")
    .insert([{ user, text }]);

  if (error) {
    console.error(error);
    throw new Error("Comment could not be added");
  }

  return data;
}

export async function deleteComments(id) {
  // Delete votes associated with the comment
  const { error: votesError } = await supabase
    .from("votes")
    .delete()
    .eq("comment", id);

  if (votesError) {
    console.error(votesError);
    throw new Error("Could not delete votes associated with the comment");
  }

  const { error: replyError } = await supabase
    .from("replies")
    .delete()
    .eq("comment", id);

  if (replyError) {
    console.error(replyError);
    throw new Error("Replies could not be deleted");
  }

  const { data, error } = await supabase.from("comments").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Comment could not be deleted");
  }

  return data;
}

export async function incrementVotes(id) {
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("votes")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Could not fetch current votes");
  }

  const newVotes = comment.votes + 1;

  const { data, error: updateError } = await supabase
    .from("comments")
    .update({ votes: newVotes })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Could not increment votes");
  }

  return data;
}

export async function decrementVotes(id) {
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("votes")
    .eq("id", id)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Could not fetch current votes");
  }

  const newVotes = comment.votes - 1;

  const { data, error: updateError } = await supabase
    .from("comments")
    .update({ votes: newVotes })
    .eq("id", id);

  if (updateError) {
    console.error(updateError);
    throw new Error("Could not decrement votes");
  }

  return data;
}

export async function editComment({ id, text }) {
  const { data, error } = await supabase
    .from("comments")
    .update({ text })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Comment could not be updated");
  }

  return data;
}
