import { createClient } from "@/lib/supabase/server";
import AdminDashboard from "@/components/admin-dashboard";
import SubscriberDashboard from "@/components/subscriber-dashboard";

export default async function Page() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return <div>Please log in</div>;
  }

  const { data: tips } = await supabase
    .from("suggested_tips")
    .select("*")
    .order("created_at", { ascending: false });

  if (user.email === "your-email@example.com") {
    return <AdminDashboard />;
  }

  return <SubscriberDashboard tips={tips || []} />;
}
