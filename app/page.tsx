import { redirect } from "next/navigation"

export default function Home() {
  // Redirect the home page to the about page
  redirect("/about")
  return null
}
