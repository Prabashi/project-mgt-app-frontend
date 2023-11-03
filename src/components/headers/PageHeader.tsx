
interface PageHeaderProps {
    title: string
}

const PageHeader = ({title}: PageHeaderProps) => {
    return <h1>{title}</h1>
}

export default PageHeader