import { BreadcrumbProps } from './types'

function Breadcrumb({ routes, currentPath }: BreadcrumbProps) {
    const selectedStyle = "font-bold"
  return (
    <div className="flex gap-2">
        {routes.map(({ name, path }, index) =>  <div key={path} className='flex gap-2'>
            <span className={`${currentPath === path && selectedStyle}`}>{name}</span>
            {index + 1 !== routes.length && (
                <span>-</span>
            )}
        </div>) 
        }
    </div>
  )
}

export default Breadcrumb