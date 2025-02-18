import db from '@/lib/prisma';
export async function generateRefferalCode(): Promise<string> {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789_';
  let refferralId = '';
  for (let i = 0; i < 7; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    refferralId += chars[randomIndex];
  }

  const existingUser = await db.user.findUnique({ where: { refferralId } });
  if (existingUser) {
    return await generateRefferalCode(); // Recursively call the function if the username already exists
  }

  return refferralId;
}
