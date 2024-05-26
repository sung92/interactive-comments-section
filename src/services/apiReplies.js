import supabase from "./supabase";

export async function getReplies() {
  let { data: replies, error } = await supabase.from("replies").select("*");

  if (error) {
    console.log(error);
    throw new Error("Replies could not be loaded");
  }

  return replies;
}

export async function getReply(id) {
  let { data: replies, error } = await supabase
    .from("replies")
    .select("*")
    // Filters
    .eq("comment", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Reply could not be loaded");
  }

  return replies;
}

export async function createReply(reply) {
  const { data, error } = await supabase.from("replies").insert([reply]);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function updateReply(id, updatedReply) {
  const { data, error } = await supabase
    .from("replies")
    .update(updatedReply)
    .eq("id", id);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

export async function deleteReply(id) {
  // Delete votes associated with the reply
  const { error: votesError } = await supabase
    .from("votes")
    .delete()
    .eq("reply", id);

  if (votesError) {
    console.error(votesError);
    throw new Error("Could not delete votes associated with the reply");
  }
  const { error } = await supabase.from("replies").delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not delete reply");
  }
}

export async function addReply({ user, text, comment }) {
  const { data, error } = await supabase
    .from("replies")
    .insert([{ user, text, comment }]);

  if (error) {
    console.error(error);
    throw new Error("Reply could not be added");
  }

  return data;
}

export async function editReply({ id, text }) {
  const { data, error } = await supabase
    .from("replies")
    .update({ text })
    .eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Reply could not be updated");
  }

  return data;
}
