import DashboardLayout from "@/layout/DashboardLayout";
import CommentsList from "@/template/Dashboard/Comments/CommentsList";

export default function CommentsPage() {
  return (
    <DashboardLayout>
      <CommentsList />
    </DashboardLayout>
  );
}

