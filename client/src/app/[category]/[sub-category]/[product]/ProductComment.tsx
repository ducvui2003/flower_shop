'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { useProductComment } from '@/hooks/use-product-comment';

interface ProductCommentProps {
  productId: number;
}

const ProductComment: React.FC<ProductCommentProps> = ({ productId }) => {
  const {
    comment,
    isPosting,
    handleCommentChange,
    handleSubmit,
    handleLike,
    commentsData,
    error,
    isLoading,
    page,
    setPage,
  } = useProductComment(productId);

  return (
    <section className="bg-white py-8 antialiased lg:py-16 dark:bg-gray-900">
      <div className="mx-auto w-full px-4">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
            Bình luận ({commentsData?.pagination?.totalItems ?? 0})
          </h2>
        </div>

        <form className="mb-6">
          <div className="mb-4 rounded-lg border border-gray-200 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
            <label htmlFor="comment" className="sr-only">Viết bình luận</label>
            <textarea
              id="comment"
              rows={6}
              className="w-full border-0 px-0 text-sm text-gray-900 focus:ring-0 focus:outline-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-400"
              placeholder="Viết bình luận..."
              value={comment}
              onChange={handleCommentChange}
              required
            />
          </div>
          <div className="flex justify-end">
            <Button onClick={handleSubmit} disabled={isPosting || !comment.trim()}>
              {isPosting ? 'Đang gửi...' : 'Gửi'}
            </Button>
          </div>
        </form>

        {isLoading ? (
          <p className="text-center text-gray-500 dark:text-gray-400">Đang tải bình luận...</p>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi tải bình luận.</p>
        ) : (
          <>
            {commentsData && commentsData.items && commentsData.items.length > 0 ? (
              commentsData?.items.map((comment) => (
                <article
                  key={comment.id}
                  className="p-6 mb-3 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900"
                >
                  <footer className="flex justify-between items-center mb-2">
                    <div className="flex items-center">
                      <p className="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold">
                        <img
                          className="mr-2 w-6 h-6 rounded-full"
                          src="https://flowbite.com/docs/images/people/profile-picture-2.jpg"
                          alt="profile"
                        />
                        {comment.username}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        <time>
                          {comment.createAt
                            ? new Date(comment.createAt).toLocaleString('vi-VN', {
                              hour: '2-digit',
                              minute: '2-digit',
                              day: '2-digit',
                              month: '2-digit',
                              year: 'numeric',
                            })
                            : 'Chưa cập nhật'}
                        </time>
                      </p>
                    </div>
                  </footer>
                  <p className="text-gray-500 dark:text-gray-400">{comment.content}</p>
                  <div className="flex items-center mt-4 space-x-4">
                    <Button type="button" className="flex items-center text-sm text-white dark:text-gray-400 font-medium">
                      <svg
                        className="mr-1.5 w-3.5 h-3.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 20 18"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
                        />
                      </svg>
                      Trả lời
                    </Button>
                    <Button
                      type="button"
                      className="flex items-center text-sm text-white dark:text-gray-400 font-medium bg-primary"
                      onClick={() => handleLike(comment.id)}
                    >
                      <svg
                        className="mr-1.5 w-4 h-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M3.172 5.172a4 4 0 0 1 5.656 0L10 6.343l1.172-1.171a4 4 0 1 1 5.656 5.656L10 17.657l-6.828-6.829a4 4 0 0 1 0-5.656Z" />
                      </svg>
                      Thích
                    </Button>

                  </div>
                </article>
              ))
            ) : (
              <p className="text-gray-500 dark:text-gray-400">Chưa có bình luận nào.</p>
            )}

            {commentsData && commentsData.pagination && commentsData.pagination.totalPages > 1 && (
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Trang {commentsData.pagination.page} / {commentsData.pagination.totalPages}
                </p>
                <div className="flex gap-2">
                  <Button onClick={() => setPage((prev:number) => Math.max(prev - 1, 1))} disabled={page === 1}>
                    Trước
                  </Button>
                  <Button
                    onClick={() => setPage((prev:number) => prev + 1)}
                    disabled={page >= commentsData.pagination.totalPages}
                  >
                    Sau
                  </Button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
};

export default ProductComment;

