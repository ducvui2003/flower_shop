import { useState } from 'react';
import {
  useCreateCommentMutation,
  useGetCommentsByProductQuery,
  useLikeCommentMutation,
} from '@/features/comment/comment.api';

export const useProductComment = (productId: number, size = 5) => {
  const [comment, setComment] = useState('');
  const [isPosting, setIsPosting] = useState(false);
  const [page, setPage] = useState(1);

  const {
    data: commentsData,
    error,
    isLoading,
    refetch,
  } = useGetCommentsByProductQuery({
    productId,
    req: { page, size },
  });

  const [createComment] = useCreateCommentMutation();
  const [likeComment] = useLikeCommentMutation();


  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleSubmit = async () => {
    if (!comment.trim()) return;

    try {
      setIsPosting(true);
      await createComment({ content: comment, product: productId }).unwrap();
      setComment('');
      refetch();
    } catch (err) {
      console.error('Error creating comment:', err);
    } finally {
      setIsPosting(false);
    }
  };

  const handleLike = async (commentId: string) => {
    try {
      await likeComment({ commentId }).unwrap();
      refetch();
    } catch (err) {
      console.error('Lỗi khi thích bình luận:', err);
    }
  };

  return {
    comment,
    setComment,
    isPosting,
    handleCommentChange,
    handleSubmit,
    handleLike,
    commentsData,
    error,
    isLoading,
    page,
    setPage,
  };
};
