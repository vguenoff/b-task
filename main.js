import './style.scss'

const searchInput = document.getElementById('searchInput')
const movies = document.querySelector('.movies')
const noResults = document.querySelector('.no-results')

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

        return data
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
            })
    } catch (error) {
        console.error(error)
    }
}

async function displayMatches() {
    const showData = await fetchShowData(this.value)

    if (this.value.length > 0 && showData.length === 0) {
        noResults.classList.remove('hidden')
    } else {
        noResults.classList.add('hidden')
    }

    movies.innerHTML = showData
        ?.map(
            show =>
                `
                <li>
                    <span class="show">${show.name}</span>
                </li>
            `,
        )
        .join('')
}

searchInput.addEventListener('keyup', displayMatches)
