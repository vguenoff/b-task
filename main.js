import './style.scss'

const searchInput = document.getElementById('searchInput')

const showData = []

const upperCaseRobot = sentence =>
    sentence
        ?.split(' ')
        .map(word =>
            word.toLowerCase().includes('robot') ? word.toUpperCase() : word,
        )
        .join(' ')

async function fetchShowData(name) {
    try {
        const res = await fetch(`https://api.tvmaze.com/search/shows?q=${name}`)
        const data = await res.json()

        showData.push(
            ...data
                .filter(({ show }) => !show.name.toLowerCase().includes('show'))
                .map(data => {
                    const { show } = data
                    const updatedShow = {
                        ...show,
                        name: upperCaseRobot(show.name),
                        summary: upperCaseRobot(show.summary),
                    }

                    return {
                        data,
                        ...updatedShow,
                    }
                }),
        )
    } catch (error) {
        console.error(error)
    }
}

await fetchShowData('robot')
console.log({ showData })
