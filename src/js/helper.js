export const getAge = dateString => {
  const today = new Date();
  const birthDate = new Date(dateString);
  let age = today.getFullYear() - birthDate.getFullYear();
  const m = today.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};

export const calculateAge = (dob, fromDate) => {
  const calculateDate = new Date(fromDate);
  const birthDate = new Date(dob);
  let age = calculateDate.getFullYear() - birthDate.getFullYear();
  const m = calculateDate.getMonth() - birthDate.getMonth();
  if (m < 0 || (m === 0 && calculateDate.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
};
