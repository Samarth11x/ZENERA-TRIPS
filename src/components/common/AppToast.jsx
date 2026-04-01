import React from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';
import { useUI } from '../../context/UIContext';
import { motion, AnimatePresence } from 'framer-motion';

const AppToast = () => {
  const { toasts } = useUI();

  return (
    <ToastContainer position="top-end" className="p-3" style={{ zIndex: 1060 }}>
      <AnimatePresence>
        {toasts.map((t) => (
          <motion.div
            key={t.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="mb-2"
          >
            <Toast className="bg-charcoal border-z text-white shadow-glow" bg="dark">
              <Toast.Header closeVariant="white" className="bg-graphite text-accent border-z">
                <strong className="me-auto text-uppercase small fw-800">Notification</strong>
              </Toast.Header>
              <Toast.Body className="small py-3">{t.message}</Toast.Body>
            </Toast>
          </motion.div>
        ))}
      </AnimatePresence>
    </ToastContainer>
  );
};

export default AppToast;
