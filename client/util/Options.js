const getOptionLabel = (options, key) => {
    return options.find(option => option.key === key).label
}

export {getOptionLabel}
