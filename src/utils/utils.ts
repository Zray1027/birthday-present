export const getEnv = () => {
  return (import.meta as any).env?.MODE || 'development'
}