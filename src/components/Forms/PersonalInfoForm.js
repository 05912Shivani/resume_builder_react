import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from 'react-hook-form';
import { TextField, Button, Box, Typography, Grid, TextareaAutosize } from '@mui/material';
import { savePersonalInfo } from '../../redux/formDataSlice';



const PersonalInfoForm = () => {
  const dispatch = useDispatch();
  const { personalInfo } = useSelector((state) => state.formData);

  // Initialize the form with default values
  const {
    control,
    handleSubmit,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: personalInfo.firstName || '',
      lastName: personalInfo.lastName || '',
      email: personalInfo.email || '',
      phone: personalInfo.phone || '',
      address: personalInfo.address || '',
      objective: personalInfo.objective || '',
      github: personalInfo.github || '',
      linkedin: personalInfo.linkedin || '',
    },
  });

  // Handle form submission
  const handleFormSubmit = (data) => {
    clearErrors(); // Clear previous errors before submitting
    dispatch(savePersonalInfo(data)); // Dispatch the action to save data in Redux store
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit(handleFormSubmit)}
      sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}
    >
      <Typography variant="h5" gutterBottom>
        Personal Information
      </Typography>

      <Grid container spacing={2}>
        {/* First Name Field */}
        <Grid item xs={6}>
          <Controller
            name="firstName"
            control={control}
            rules={{ required: 'First Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="First Name"
                error={!!errors.firstName}
                helperText={errors.firstName?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        {/* Last Name Field */}
        <Grid item xs={6}>
          <Controller
            name="lastName"
            control={control}
            rules={{ required: 'Last Name is required' }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Last Name"
                error={!!errors.lastName}
                helperText={errors.lastName?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      <Grid container spacing={2}>
        {/* Email Field */}
        <Grid item xs={6}>
          <Controller
            name="email"
            control={control}
            rules={{
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Email format validation
                message: 'Invalid email format',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Email"
                error={!!errors.email}
                helperText={errors.email?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        {/* Phone Number Field */}
        <Grid item xs={6}>
          <Controller
            name="phone"
            control={control}
            rules={{
              required: 'Phone number is required',
              pattern: {
                value: /^[0-9]{10}$/,
                message: 'Phone number must be 10 digits',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="Phone Number"
                error={!!errors.phone}
                helperText={errors.phone?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Address Field */}
      <Controller
        name="address"
        control={control}
        rules={{ required: 'Address is required' }}
        render={({ field }) => (
          <TextField
            {...field}
            label="Address"
            error={!!errors.address}
            helperText={errors.address?.message}
            fullWidth
          />
        )}
      />

      <Grid container spacing={2}>
        {/* GitHub Profile Link Field */}
        <Grid item xs={6}>
          <Controller
            name="github"
            control={control}
            rules={{
              pattern: {
                value: /^https?:\/\/(www\.)?github\.com\/\S+$/,
                message: 'Enter a valid GitHub profile URL',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="GitHub Link"
                placeholder="https://github.com/username"
                error={!!errors.github}
                helperText={errors.github?.message}
                fullWidth
              />
            )}
          />
        </Grid>
        {/* LinkedIn Profile Link Field */}
        <Grid item xs={6}>
          <Controller
            name="linkedin"
            control={control}
            rules={{
              pattern: {
                value: /^https?:\/\/(www\.)?linkedin\.com\/in\/\S+$/,
                message: 'Enter a valid LinkedIn profile URL',
              },
            }}
            render={({ field }) => (
              <TextField
                {...field}
                label="LinkedIn Link"
                placeholder="https://linkedin.com/in/username"
                error={!!errors.linkedin}
                helperText={errors.linkedin?.message}
                fullWidth
              />
            )}
          />
        </Grid>
      </Grid>

      {/* Objective Field */}
      <Controller
        name="objective"
        control={control}
        rules={{
          required: 'Objective is required',
          validate: (value) =>
            value.length >= 20 || 'Objective must be at least 20 characters',
        }}
        render={({ field }) => (
          <Box>
            <Typography variant="h6" gutterBottom>
              Objective
            </Typography>
            <TextareaAutosize
              {...field}
              minRows={5}
              placeholder="Write your career objective..."
              style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
            />
            {errors.objective && (
              <Typography color="error" variant="body2">
                {errors.objective.message}
              </Typography>
            )}
          </Box>
        )}
      />

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Save
      </Button>
    </Box>
  );
};

export default PersonalInfoForm;
