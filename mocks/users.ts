import { User } from '@/types/user';

export const mockUsers: User[] = [
  {
    id: '1',
    email: 'elzataitmukhamedov@gmail.com',
    name: 'Эльзат Айтмухамедов',
    role: 'Сотрудник',
    avatar: 'https://media.discordapp.net/attachments/770945735248052227/1360942720864096366/avatar1.jpg?ex=67fcf42d&is=67fba2ad&hm=9eb86760948ff187bba303ad6c848c80aac5f5cf8f07233297590198e3b65fe8&=&format=webp&width=900&height=900',
    phone: '+7 (701) 125-4287',
    position: 'IT инженер',
    createdAt: '2023-01-15T08:00:00Z',
  },
  {
    id: '2',
    email: 'nasiba@gmail.com',
    name: 'Насиба Пашанова',
    role: 'Клиент',
    avatar: 'https://media.discordapp.net/attachments/770945735248052227/1360942721069744210/avatar2.jpg?ex=67fcf42d&is=67fba2ad&hm=88559acb5005e268527923f8c366bf8180b469393cf62c0b2907036bda0eb03f&=&format=webp&width=900&height=900',
    phone: '+7 (708) 399-4740',
    company: 'Г. Кентау, Компания TechCorp Inc.',
    createdAt: '2023-02-20T10:30:00Z',
  },
  {
    id: '3',
    email: 'maksat@gmail.com',
    name: 'Максат Абдухаликов',
    role: 'Сотрудник',
    avatar: 'https://media.discordapp.net/attachments/770945735248052227/1360942721291784263/avatar3.jpg?ex=67fcf42d&is=67fba2ad&hm=f95aa86db51814117db5f614d46fb878f76ae0b9491b0045907777ca26d511b6&=&format=webp&width=900&height=900',
    phone: '+7 (775) 814-2222',
    position: 'Менеджер по продажам',
    createdAt: '2023-01-10T09:15:00Z',
  },
  {
    id: '4',
    email: 'leila@gmail.com',
    name: 'Лейла Тенлесбекова',
    role: 'Клиент',
    avatar: 'https://media.discordapp.net/attachments/770945735248052227/1360942721518407821/avatar4.jpg?ex=67fcf42d&is=67fba2ad&hm=0b6b9612452166a45bf6cfc69d4fb0bd977813048973accbc08aa0c9798658ba&=&format=webp&width=900&height=900',
    phone: '+7 (747) 870-0432',
    company: 'Г. Кентау, Компания Mega Planet Ltd.',
    createdAt: '2023-03-05T14:20:00Z',
  },
  {
    id: '5',
    email: 'daulet@gmail.com',
    name: 'Даулет Абулкасимов',
    role: 'Директор',
    avatar: 'https://media.discordapp.net/attachments/770945735248052227/1360942721719861339/avatar5.jpg?ex=67fcf42d&is=67fba2ad&hm=1dae2d3a0bc00a27fbe023c00d9efe2715ddc422f14f92d9cae07fb4cace7649&=&format=webp&width=900&height=900',
    phone: '+7 (771) 258-3764',
    position: 'CEO Директор',
    createdAt: '2023-01-01T00:00:00Z',
  },
];

export const getUser = (email: string, password: string): User | null => {
  return mockUsers.find(user => user.email === email) || null;
};