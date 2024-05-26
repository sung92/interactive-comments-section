import supabase from "./supabase";

export async function fetchVoteStatus(replyId, userId) {
  console.log(`Fetching vote status for reply: ${replyId}, user: ${userId}`);
  const { data, error } = await supabase
    .from("votes")
    .select("id, vote")
    .eq("reply", replyId)
    .eq("user", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    console.error("Fetch error: ", error);
    throw new Error("Could not fetch vote status");
  }

  return data ? data : null;
}

export async function upvote(replyId, userId) {
  const voteStatus = await fetchVoteStatus(replyId, userId);

  if (voteStatus) {
    if (voteStatus.vote === 1) {
      await removeVote(voteStatus.id, replyId, 1);
      return "removed";
    } else {
      await updateVote(voteStatus.id, replyId, 1, 2);
      return "upvoted";
    }
  } else {
    await addVote(replyId, userId, 1);
    return "upvoted";
  }
}

export async function downvote(replyId, userId) {
  const voteStatus = await fetchVoteStatus(replyId, userId);

  if (voteStatus) {
    if (voteStatus.vote === -1) {
      await removeVote(voteStatus.id, replyId, -1);
      return "removed";
    } else {
      await updateVote(voteStatus.id, replyId, -1, -2);
      return "downvoted";
    }
  } else {
    await addVote(replyId, userId, -1);
    return "downvoted";
  }
}

async function addVote(replyId, userId, vote) {
  const { error } = await supabase
    .from("votes")
    .insert({ reply: replyId, user: userId, vote });

  if (error) {
    console.error(error);
    throw new Error("Could not add vote");
  }

  await updateReplyVotes(replyId, vote);
}

async function updateVote(voteId, replyId, vote, increment) {
  const { error } = await supabase
    .from("votes")
    .update({ vote })
    .eq("id", voteId);

  if (error) {
    console.error(error);
    throw new Error("Could not update vote");
  }

  await updateReplyVotes(replyId, increment);
}

async function removeVote(voteId, replyId, decrement) {
  const { error } = await supabase.from("votes").delete().eq("id", voteId);

  if (error) {
    console.error(error);
    throw new Error("Could not remove vote");
  }

  await updateReplyVotes(replyId, -decrement);
}

async function updateReplyVotes(replyId, increment) {
  const { data: reply, error: fetchError } = await supabase
    .from("replies")
    .select("votes")
    .eq("id", replyId)
    .single();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Could not fetch current votes");
  }

  const newVotes = reply.votes + increment;

  const { error: updateError } = await supabase
    .from("replies")
    .update({ votes: newVotes })
    .eq("id", replyId);

  if (updateError) {
    console.error(updateError);
    throw new Error("Could not update reply votes");
  }
}
