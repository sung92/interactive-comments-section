import supabase from "./supabase";

export async function getUsers() {
  let { data: users, error } = await supabase.from("users").select("*");

  if (error) {
    console.log(error);
    throw new Error("Users could not be found");
  }

  return users;
}

export async function getUser(id) {
  let { data: user, error } = await supabase
    .from("users")
    .select("*") // Specify the columns you want to retrieve
    .eq("id", id)
    .single();

  if (error) {
    console.log(error);
    throw new Error("User could not be found");
  }

  return user;
}
