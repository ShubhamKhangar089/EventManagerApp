/* eslint-disable react/prop-types */
import { useState } from 'react';
import axios from 'axios';
import { Button, useToast } from '@chakra-ui/react';

const EventRegistration = ({ eventId, isRegistered, onUpdate }) => {
  const [loading, setLoading] = useState(false);
  const toast = useToast();

  const handleRegister = async () => {
    setLoading(true);
    try {
      await axios.post(`http://localhost:8080/event/register/:{id}`);  //id is user id login
      onUpdate();
      toast({
        title: 'Registered',
        description: 'You have successfully registered for the event.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  const handleCancel = async () => {
    setLoading(true);
    try {
      await axios.post(`/api/events/${eventId}/cancel`);
      onUpdate();
      toast({
        title: 'Cancelled',
        description: 'Your registration has been cancelled.',
        status: 'info',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response.data.message || 'An error occurred',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
    setLoading(false);
  };

  return (
    <>
      {isRegistered ? (
        <Button onClick={handleCancel} isLoading={loading} colorScheme="red">
          Cancel Registration
        </Button>
      ) : (
        <Button onClick={handleRegister} isLoading={loading} colorScheme="teal">
          Register
        </Button>
      )}
    </>
  );
};

export default EventRegistration;
