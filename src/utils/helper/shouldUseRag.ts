export function shouldUseRag(
  message: string,
) {
  return (
    [
      'café',
      'bebida',
      'cardápio',
      'produto',
      'grão',
    ].some(word =>
      message
        .toLowerCase()
        .includes(word),
    )
  );
}