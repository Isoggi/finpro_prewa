import React from 'react';
type Props = { text: string; time: Date | undefined; id: number; user: string };

export function TenantChatReview({ text, time, user }: Props) {
  return (
    <div className="chat chat-end">
      <div className="chat-header">
        {user}
        <time className="text-xs opacity-50">
          {time?.toLocaleString('id-ID')}
        </time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">Pemilik</div>
    </div>
  );
}

export function UserChatReview({ text, time, user }: Props) {
  return (
    <div className="chat chat-start">
      <div className="chat-header">
        {user}
        <time className="text-xs opacity-50">
          {time?.toLocaleString('id-ID')}
        </time>
      </div>
      <div className="chat-bubble">{text}</div>
      <div className="chat-footer opacity-50">Pernah menginap</div>
    </div>
  );
}
