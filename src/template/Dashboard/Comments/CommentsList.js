"use client";

import React from "react";
import CommentCard from "./CommentCard";

function CommentsList({ comments, setComments }) {
  const handleDelete = (commentId) => {
    if (confirm("آیا از حذف این نظر اطمینان دارید؟")) {
      setComments(comments.filter((c) => c.id !== commentId));
    }
  };

  const handleEdit = (commentId) => {
    // Handle edit logic
    console.log("Edit comment:", commentId);
  };

  return (
    <div className="space-y-4">
      {comments.length === 0 ? (
        <div className="bg-white dark:bg-dark-box rounded-2xl shadow-sm p-8 text-center">
          <p className="text-gray-500 dark:text-dark-text">هیچ نظری ثبت نشده است</p>
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
    </div>
  );
}

export default CommentsList;
