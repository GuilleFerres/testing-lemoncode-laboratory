import React from 'react';
import { ConfirmationDialogComponent } from '#common/components/confirmation-dialog';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('common/ConfirmationDialogComponent', () => {
    it('should render the component', () => {
        // Arrange
        const isOpen = true;
        const onAccept = vi.fn();
        const onClose = vi.fn();
        const title = 'Test Title';
        const labels = {
            closeButton: 'Close',
            acceptButton: 'Accept',
        };
        const children = <div>Test Children</div>;
        // Act
        const { getByRole } = render(
            <ConfirmationDialogComponent
                isOpen={isOpen}
                onAccept={onAccept}
                onClose={onClose}
                title={title}
                labels={labels}
                children={children}
            />
        );
        // Assert
        const dialog = getByRole('dialog');
        const element = getByRole('heading', { name: title, level: 2 });

        expect(dialog).not.toBeNull();
        expect(element).not.toBeNull();
    });
    it('should render the component', () => {
        // Arrange
        const isOpen = true;
        const onAccept = vi.fn();
        const onClose = vi.fn();
        const title = 'Test Title';
        const labels = {
            closeButton: 'Close',
            acceptButton: 'Accept',
        };
        const children = <div>Test Children</div>;
        // Act
        const { asFragment } = render(
            <ConfirmationDialogComponent
                isOpen={isOpen}
                onAccept={onAccept}
                onClose={onClose}
                title={title}
                labels={labels}
                children={children}
            />
        );
        // Assert
        expect(asFragment()).toMatchSnapshot();
       
    });
    it('should have a accept button', async () => { 
        // Arrange
        const onAccept = vi.fn();
        const onClose = vi.fn();
        const title = 'Test Title';
        const labels = {
            closeButton: 'Close',
            acceptButton: 'Accept',
        };
        const { getByRole } = render(
            <ConfirmationDialogComponent
                isOpen={true}
                onAccept={onAccept}
                onClose={onClose}
                title={title}
                labels={labels}
                children={<div>Test Children</div>}
            />
        );
        // Act
        const acceptButton = getByRole('button', { name: labels.acceptButton });
        // Assert
        expect(acceptButton).toBeInTheDocument();
    
    });
    it('should have a close button', async () => { 
        // Arrange
        const onAccept = vi.fn();
        const onClose = vi.fn();
        const title = 'Test Title';
        const labels = {
            closeButton: 'Close',
            acceptButton: 'Accept',
        };
        const { getByRole } = render(
            <ConfirmationDialogComponent
                isOpen={true}
                onAccept={onAccept}
                onClose={onClose}
                title={title}
                labels={labels}
                children={<div>Test Children</div>}
            />
        );
        // Act
        const closeButton = getByRole('button', { name: labels.closeButton });
        // Assert
        expect(closeButton).toBeInTheDocument();
    
    });
    it('should call onClose when the close button is clicked', async () => {
      // Arrange
      const props: React.ComponentProps<typeof ConfirmationDialogComponent> = {
        isOpen: true,
        onAccept: vi.fn(),
        onClose: vi.fn(),
        title: 'Test Title',
        labels: {
          closeButton: 'Close',
          acceptButton: 'Accept',
        },
        children: <div>Test Children</div>,
      };
      
      // Act
      const { getByRole } = render(<ConfirmationDialogComponent {...props} />);
      
      // Assert
      const closeButton = getByRole('button', { name: props.labels.closeButton });
      await userEvent.click(closeButton);
      expect(props.onClose).toHaveBeenCalled();
    });

    it('should call onAccept when the accept button is clicked', async () => {
        // Arrange
        const props: React.ComponentProps<typeof ConfirmationDialogComponent> = {
          isOpen: true,
          onAccept: vi.fn(),
          onClose: vi.fn(),
          title: 'Test Title',
          labels: {
            closeButton: 'Close',
            acceptButton: 'Accept',
          },
          children: <div>Test Children</div>,
        };
        
        // Act
        const { getByRole } = render(<ConfirmationDialogComponent {...props} />);

        // Assert
        const acceptButton = getByRole('button', { name: props.labels.acceptButton });
        await userEvent.click(acceptButton);
        expect(props.onAccept).toHaveBeenCalled();
      });
});