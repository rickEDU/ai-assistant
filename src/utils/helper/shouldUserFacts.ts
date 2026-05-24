export function shouldUseFacts(
  message: string,
): boolean {
  return (
    [
      'eu',
      'meu',
      'minha',
      'gosto',
      'prefiro',
      'costumo',
      'sou',
      'tenho',
      'odeio',
      'adoro',
      'recomenda',
      'recomendação',
      'o que você sabe sobre mim',
      'lembra de mim',
      'baseado no que você sabe',
      'algo pra mim',
      'o que combina comigo',
    ].some(word =>
      message
        .toLowerCase()
        .includes(word),
    )
  );
}