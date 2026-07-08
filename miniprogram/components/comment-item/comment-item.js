// components/comment-item/comment-item.js
const { formatTime } = require('../../utils/util');

Component({
  properties: {
    comment: {
      type: Object,
      value: {},
      observer(newVal) {
        if (newVal && newVal.id) {
          const timeFormatted = formatTime(newVal.createdAt);
          const replies = (newVal.replies || []).map(r => ({
            ...r,
            timeFormatted: formatTime(r.createdAt)
          }));
          this.setData({
            'comment.timeFormatted': timeFormatted,
            'comment.replies': replies
          });
        }
      }
    }
  },

  methods: {
    onUserTap(e) {
      const userId = e.currentTarget.dataset.userId;
      this.triggerEvent('usertap', { userId });
    },

    onReplyTap(e) {
      const { comment, replyUser } = e.currentTarget.dataset;
      this.triggerEvent('reply', {
        comment: comment,
        replyToUser: replyUser
      });
    },

    onCommentLikeTap() {
      this.triggerEvent('commentlike', { commentId: this.data.comment.id });
    }
  }
});
