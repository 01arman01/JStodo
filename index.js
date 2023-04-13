

const Form = (add)=>{
    const  container = document.createElement('form')
    container.innerHTML = `
    <input type="text"/>
    <button type="submit">Send</button>
    `
    container.addEventListener('submit',e=>{
        e.preventDefault()
       const render = ()=>{
           const input = container.querySelector('input')
           // console.log(input.value)
           add(input.value)
           input.value = ''
       }
        render()
    })
    
    return container
}


const  ListItem = (item,change)=>{
    const container = document.createElement('div')
    container.innerHTML = `
     <input type="checkbox"  ${item.status?'checked':''}/>
     <span>${item.comment}</span>
    `
    const input = container.querySelector('input')
    input.addEventListener('change',(e)=>{
        // console.log(e.target.checked)
        change(item,e.target.checked)
    })
    return container
}
const List =(data,change)=>{
    const container = document.createElement('div')
      data.map(item=>{
          container.appendChild(ListItem(item,(item,status)=>{
                data.forEach((elem,index)=>{
                  if(elem.comment ===item.comment){
                      data[index].status = status
                  }
              })

              change()
              // data = data1

          }))
      })
    return container
    
}

const Footer = (data,onFilter)=>{
    const container = document.createElement('footer')
    
    container.innerHTML = `
    <div>
    <span>${data.length}/${data.filter(item=>item.status == true).length}</span>
    <button type="submit"> Dellete checked</button>
    </div>
    `
    const btn = container.querySelector('button')
    btn.addEventListener('click',()=>{
        onFilter(data.filter(item=>item.status === false))
    })
    
    return container
}



const App  = ()=>{
    let data =[
       
    ]

    
    const container = document.createElement('div')
    const render = ()=>{
        container.innerHTML = ''
        container.appendChild(Form((newText)=>{
            data.push({
                comment: newText,
                status: false
            })
            render()
        }))
        container.appendChild(List(data,()=>{
            render()
        }))
        container.appendChild(Footer(data,(newdata)=>{
            data = newdata
            render()
        }))
    }
    render()
    return container
}
const root = document.getElementById('root')

root.appendChild(App())