const screen = {
    userProfile: document.querySelector('.profile-data'),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                                        <div class="data">
                                            <h1>${user.name ?? 'Não possui nome cadastrado 😢'}</h1>
                                            <p>${user.bio ?? 'Não possui bio cadastrada 😢'}</p>
                                            <p>👥 Followers: ${user.followers}</p>
                                            <p>👥 Following: ${user.following}</p>
                                        </div>
                                     </div>`
        
        let repositoriesItens = ''
        user.repositories.forEach(repo => repositoriesItens += `<li><a href="${repo.html_url}" target="_blank">${repo.name} <div class="info"><span>🍴${repo.forks ?? 'Sem forks'}</span> <span>⭐${repo.stargazers_count ?? 'Sem stars'}</span> <span>👀${repo.watchers ?? 'Sem watchers'}</span> <span>👨‍💻${repo.language ?? 'Sem linguagem'}</span></div></a></li>`)
        
        if(user.repositories.length > 0) {
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                          </div>`
        }

        let eventsItens = ''
        user.events.forEach(event => { 
            
            if(event.type === "CreateEvent"){ 
                eventsItens += `<li>
                                    <h3>${event.repo.name}</h3>
                                    <p> - ${event.payload.ref_type}</p>
                               </li>`
            } else {
                eventsItens += `<li>
                                    <h3>${event.repo.name}</h3> 
                                    <p> - ${event.payload.commits[0].message}</p>
                               </li>`
            }
        })
        
        if(user.events.length > 0) {
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                          </div>`
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>"
    }
}

export { screen }