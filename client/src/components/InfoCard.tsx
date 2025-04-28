export default function InfoCard({ title, content }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-md hover:shadow-xl transition-shadow">
      <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
        {title}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">{content}</p>
    </div>
  )
}
