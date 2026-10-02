'use client';

import { ConfirmButton, SubmitButton } from './buttons';
import { buttonSecondary } from './ui';

type Props = {
  moveUp: () => Promise<void>;
  moveDown: () => Promise<void>;
  remove: () => Promise<void>;
  isFirst: boolean;
  isLast: boolean;
};

export function ImageOrderControls({ moveUp, moveDown, remove, isFirst, isLast }: Props) {
  return (
    <div className="flex flex-wrap items-center gap-2 border-t border-zinc-200 pt-3">
      {!isFirst && (
        <form action={moveUp}>
          <SubmitButton className={buttonSecondary} pendingLabel="Moving..." aria-label="Move photo earlier">
            Move up
          </SubmitButton>
        </form>
      )}
      {!isLast && (
        <form action={moveDown}>
          <SubmitButton className={buttonSecondary} pendingLabel="Moving..." aria-label="Move photo later">
            Move down
          </SubmitButton>
        </form>
      )}
      <div className="ml-auto">
        <ConfirmButton
          action={remove}
          label="Delete"
          prompt="Delete this photo?"
          confirmLabel="Yes, delete"
        />
      </div>
    </div>
  );
}
