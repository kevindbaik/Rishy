import React, { useState } from 'react';
import { TextField, Switch, FormControlLabel, Button, Box } from '@mui/material';

function PlaylistForm ({ onSubmit }) {
  const [formValues, setFormValues] = useState({ name: '', private: false});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormValues({
      ...formValues,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formValues)
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        label="Playlist Name"
        variant="outlined"
        name="name"
        value={formValues.name}
        onChange={handleChange}
        required
      />
      <FormControlLabel
        control={<Switch checked={formValues.private} onChange={handleChange} name="private" />}
        label="Private"
      />
      <Button type="submit" variant="contained">
        Create Playlist
      </Button>
    </Box>
  );
}

export default PlaylistForm
