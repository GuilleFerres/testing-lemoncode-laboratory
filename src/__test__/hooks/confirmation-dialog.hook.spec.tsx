import { act, renderHook } from '@testing-library/react';
import { useConfirmationDialog } from '#common/components/confirmation-dialog';
import { createEmptyLookup } from '#common/models';

describe('common/useConfirmationDialog', () => {
  it('should start with dialog closed and empty item', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    expect(result.current.isOpen).toBe(false);
    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });

  it('should open dialog and set item when onOpenDialog is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());
    const item = { id: '1', name: 'OpenTestItem' };

    act(() => {
      result.current.onOpenDialog(item);
    });

    expect(result.current.isOpen).toBe(true);
    expect(result.current.itemToDelete).toEqual(item);
  });

  it('should close dialog when onClose is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'CloseTestItem' });
    });
    act(() => {
      result.current.onClose();
    });

    expect(result.current.isOpen).toBe(false);
  });

  it('should reset itemToDelete when onAccept is called', () => {
    const { result } = renderHook(() => useConfirmationDialog());

    act(() => {
      result.current.onOpenDialog({ id: '1', name: 'AcceptTestItem' });
    });
    act(() => { 
      result.current.onAccept();
    });

    expect(result.current.itemToDelete).toEqual(createEmptyLookup());
  });
});
