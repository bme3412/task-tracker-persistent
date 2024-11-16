import ClientOnly from '@/components/ClientOnly';
import TaskTracker from '@/components/TaskTracker';

export default function Home() {
  return (
    <main className="min-h-screen">
      <ClientOnly>
        <TaskTracker />
      </ClientOnly>
    </main>
  );
}