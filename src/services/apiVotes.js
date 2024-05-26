import supabase from "./supabase";

export async function getVoteStatus(commentId, userId) {
  const { data, error } = await supabase
    .from("votes")
    .select("*")
    .eq("comment", commentId)
    .eq("user", userId)
    .single();

  if (error && error.code !== "PGRST116") {
    // Ignore 'PGRST116' which means no matching row found
    console.error(error);
    throw new Error("Could not fetch vote status");
  }

  return data;
}

export async function fetchVoteStatus(commentId, userId) {
  console.log(
    `Fetching vote status for comment: ${commentId}, user: ${userId}`
  );
  const { data, error } = await supabase
    .from("votes")
    .select("vote")
    .eq("comment", commentId)
    .eq("user", userId)
    .maybeSingle();

  if (error) {
    if (error.code === "PGRST116") {
      console.log("No matching vote found. Returning null.");
      return null;
    } else {
      console.error("Fetch error: ", error);
      throw new Error("Could not fetch vote status");
    }
  }

  // console.log("Vote status fetched: ", data);
  return data ? data.vote : null;
}

export async function upvote(commentId, userId) {
  const voteStatus = await getVoteStatus(commentId, userId);

  if (voteStatus) {
    if (voteStatus.vote === 1) {
      // If already upvoted, remove the vote
      await removeVote(voteStatus.id, commentId, 1);
      return "removed";
    } else {
      // If downvoted, change to upvote
      await updateVote(voteStatus.id, commentId, 1, 2);
      return "upvoted";
    }
  } else {
    // No vote yet, insert upvote
    await addVote(commentId, userId, 1);
    return "upvoted";
  }
}

export async function downvote(commentId, userId) {
  const voteStatus = await getVoteStatus(commentId, userId);

  if (voteStatus) {
    if (voteStatus.vote === -1) {
      // If already downvoted, remove the vote
      await removeVote(voteStatus.id, commentId, -1);
      return "removed";
    } else {
      // If upvoted, change to downvote
      await updateVote(voteStatus.id, commentId, -1, -2);
      return "downvoted";
    }
  } else {
    // No vote yet, insert downvote
    await addVote(commentId, userId, -1);
    return "downvoted";
  }
}

async function addVote(commentId, userId, vote) {
  const { error } = await supabase
    .from("votes")
    .insert({ comment: commentId, user: userId, vote });

  if (error) {
    console.error(error);
    throw new Error("Could not add vote");
  }

  await updateCommentVotes(commentId, vote);
}

async function updateVote(voteId, commentId, vote, increment) {
  const { error } = await supabase
    .from("votes")
    .update({ vote })
    .eq("id", voteId);

  if (error) {
    console.error(error);
    throw new Error("Could not update vote");
  }

  await updateCommentVotes(commentId, increment);
}

async function removeVote(voteId, commentId, decrement) {
  const { error } = await supabase.from("votes").delete().eq("id", voteId);

  if (error) {
    console.error(error);
    throw new Error("Could not remove vote");
  }

  await updateCommentVotes(commentId, -decrement);
}

async function updateCommentVotes(commentId, increment) {
  const { data: comment, error: fetchError } = await supabase
    .from("comments")
    .select("votes")
    .eq("id", commentId)
    .maybeSingle();

  if (fetchError) {
    console.error(fetchError);
    throw new Error("Could not fetch current votes");
  }

  const newVotes = comment.votes + increment;

  const { error: updateError } = await supabase
    .from("comments")
    .update({ votes: newVotes })
    .eq("id", commentId);

  if (updateError) {
    console.error(updateError);
    throw new Error("Could not update comment votes");
  }
}
