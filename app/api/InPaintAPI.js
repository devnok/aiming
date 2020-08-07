import { apiClient } from '.';

export const uploadVideo = file => {
  const formData = new FormData();
  formData.append('file', file);
  return apiClient.post('inpainting', formData, {
    headers: {
      'Content-Type': 'multipart/formdata',
    },
  });
};

export const updateBox = ({ x, y, w, h, filename }) => {
  return apiClient.post('box', {
    x,
    y,
    w,
    h,
    filename,
  });
};

export const fetchVideo = ({filename}) => {
  return apiClient.get('done/' + filename);
};
