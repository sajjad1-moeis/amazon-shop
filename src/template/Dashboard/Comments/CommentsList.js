"use client";

import React, { useState } from "react";
import CommentCard from "./CommentCard";
import ConfirmDialog from "@/components/ConfirmDialog";
import { Button } from "@/components/ui/button";

function CommentsList({ comments, setComments }) {
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedCommentId, setSelectedCommentId] = useState(null);

  const handleDelete = (commentId) => {
    setSelectedCommentId(commentId);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = () => {
    if (selectedCommentId) {
      setComments(comments.filter((c) => c.id !== selectedCommentId));
      setDeleteDialogOpen(false);
      setSelectedCommentId(null);
    }
  };

  const handleEdit = (commentId) => {
    // Handle edit logic
    console.log("Edit comment:", commentId);
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="mt-20 flex-center flex-col p-8 text-center">
          <h3 className="text-lg md:text-2xl text-primary-500 mb-2 dark:text-primary-300">
            شما هنوز نظری ثبت نکرده اید.
          </h3>
          <p className="max-md:text-xs text-primary-300 font-thin dark:text-caption">
            با ثبت نظر، به سایر خریداران کمک میکنید.
          </p>
          <Button className="bg-yellow-400 mt-8 hover:bg-yellow-500 text-primary-800  font-medium rounded-lg">
            مشاهده محصولات خریداری شده
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {comments.map((comment) => (
            <CommentCard
              key={comment.id}
              comment={comment}
              onDelete={() => handleDelete(comment.id)}
              onEdit={() => handleEdit(comment.id)}
            />
          ))}
        </div>
      )}

      <ConfirmDialog
        open={deleteDialogOpen}
        onOpenChange={setDeleteDialogOpen}
        title="حذف نظر"
        description="آیا از حذف این نظر اطمینان دارید؟ این عمل غیرقابل بازگشت است."
        onConfirm={handleDeleteConfirm}
        theme="dashboard"
      />
    </div>
  );
}

export default CommentsList;
