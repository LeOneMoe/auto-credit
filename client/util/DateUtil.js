const toIsoString = (date) => {
    return new Date(date).toLocaleDateString(`en-GB`)
}

export {toIsoString}
