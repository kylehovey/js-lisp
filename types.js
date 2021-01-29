const typeOfClass = ([__class]) => __type => ({
  [__type]: props => ({ __class, __type, ...props }),
});

module.exports = {
  ...typeOfClass`structure`('root'),
  ...typeOfClass`structure`('expression'),
  ...typeOfClass`atom`('number'),
  ...typeOfClass`atom`('number'),
  ...typeOfClass`atom`('string'),
  ...typeOfClass`atom`('symbol'),
  ...typeOfClass`atom`('boolean'),
  ...typeOfClass`atom`('operator'),
  ...typeOfClass`atom`('definition'),
  ...typeOfClass`reference`('variable'),
  ...typeOfClass`void`('void'),
};
