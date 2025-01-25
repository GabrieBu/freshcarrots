// eslint-disable-next-line react/prop-types
function Skeleton({value}) {
    return (
    <p aria-hidden="true">
        <span className={`placeholder col-${value}`}></span>
    </p>)
}

export default Skeleton;