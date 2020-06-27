
/** 
 * TODO: make this a new component 
 * */
<div className="return-visits-container">
                {this.state.user ?
                    <div>
                      <div className='user-profile'>
                         <img src={this.state.user.photoURL} />
                      </div>
                        <div className="modal" id="modal-one" aria-hidden="true">
                            <div className="modal-dialog">
                                <div className="modal-header">
                                    <h2>AGREGAR UNA REVISITA</h2>
                                    <a href="#" className="btn-close" onClick={this.closeFormBox} aria-hidden="true">x</a>
                                </div>
                                <div className="modal-body" style={{ height: modalHeight }}>
                                    <section className='add-item'>
                                        {/* <div>AGREGAR UNA REVISITA <button className="pure-button" onClick={this.openFormBox}>Cerrar</button></div> */}
                                        <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                                            <label>
                                                Nombre:
                                    <input type="text" name="pName" value={this.state.pName} placeholder="Nombre" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                Celular:
                                    <input type="text" name="pCel" value={this.state.pCel} placeholder="Celular" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                Dirección:
                                    <input type="text" name="pDir" value={this.state.pDir} placeholder="Dirección" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                Barrio:
                                    <input type="text" name="pBarrio" value={this.state.pBarrio} placeholder="Barrio" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                Descripción:
                                    <textarea type="text" name="pDesc" value={this.state.pDesc} placeholder="Descripción" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                Publicación:
                                        <select name="pPub" onChange={this.handleChange}>
                                            <option value="0" >Ninguna</option>
                                            <option value="BN">Buenas Noticias</option>
                                            <option value="EN">Enseña</option>
                                            <option selected value="W">Revista</option>
                                            <option value="TR">Tratado</option>
                                        </select>
                                            </label>
                                            <label>
                                                Fecha de regreso:
                                    <input type="date" name="dateBack" value={this.state.dateBack} placeholder="Fecha de regreso" onChange={this.handleChange} />
                                            </label>
                                            <label>
                                                <input type="hidden" name="dateInit" value={this.state.dateInit} value={this.state.dateInit} placeholder={this.state.value} onChange={this.handleChange} />
                                            </label>
                                            <input type="hidden" name="username" placeholder="What's your name?" onChange={this.handleChange} defaultValue={this.state.user.displayName || this.state.user.email} />
                                            <input type="hidden" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} defaultValue={this.state.currentItem} />
                                            <button>Agregar</button>
                                        </form>
                                    </section>
                                </div>
                                {/* <div className="modal-footer">
                                    <a href="#" className="btn">Cerrar</a>
                                </div> */}
                            </div>
                        </div>
                        {/* <a href="#modal-one" className="btn btn-big">Modal!</a> */}
                      <div className='container'>
                      {this.state.addBox == 'show' ?
                        {/* <section className='add-item'>
                                    <div>AGREGAR UNA REVISITA <button className="pure-button"  onClick={this.openFormBox}>Cerrar</button></div>
                            <form onSubmit={this.handleSubmit} className="pure-form pure-form-stacked">
                                <label>
                                    Nombre:
                                    <input type="text" name="pName" placeholder="Nombre" onChange={this.handleChange}/>
                                </label>
                                <label>
                                    Celular:
                                    <input type="text" name="pCel" placeholder="Celular" onChange={this.handleChange} />
                                </label>
                                <label>
                                    Dirección:
                                    <input type="text" name="pDir" placeholder="Dirección" onChange={this.handleChange}/>
                                </label>
                                <label>
                                    Barrio:
                                    <input type="text" name="pBarrio" placeholder="Barrio" onChange={this.handleChange}/>
                                </label>
                                <label>
                                    Descripción:
                                    <textarea type="text" name="pDesc" placeholder="Descripción" onChange={this.handleChange}/>
                                </label>
                                <label>
                                    Publicación:
                                    <select name="pPub" onChange={this.handleChange}>
                                        <option value = "0" >Ninguna</option>
                                        <option value="BN">Buenas Noticias</option>
                                        <option value="EN">Enseña</option>
                                        <option selected value="W">Revista</option>
                                        <option value="TR">Tratado</option>
                                    </select>
                                </label>
                                <label>
                                    Fecha de regreso:
                                    <input type="date" name="dateBack" placeholder="Fecha de regreso" onChange={this.handleChange} />
                                </label>
                                <label>
                                        <input type="text" name="dateInit" value={this.state.dateInit} placeholder={this.state.value} onChange={this.handleChange}/>
                                </label>
                                <input type="text" name="username" placeholder="What's your name?" onChange={this.handleChange} defaultValue={this.state.user.displayName || this.state.user.email} />
                                <input type="text" name="currentItem" placeholder="What are you bringing?" onChange={this.handleChange} defaultValue={this.state.currentItem} />
                            <button>Agregar</button>
                          </form>
                        </section> */}
                        :
                                <button className="pure-button pure-button-primary center" onClick={this.openFormBox}>AGREGAR REVISITA</button>
                    }
                      </div>
                    </div>
                    :
                    <div className='wrapper'>
                      <p>You must be logged in to see the potluck list and submit to it.</p>
                    </div>
                }
                <div className='container'>
                      {/* .. */}
                      <section className='display-item'>
                        <div className="wrapper">
                          <ul>
                            {this.state.items.map((item) => {
                                var delButton = "";
                                var editButton = "";
                                if (item.user === this.state.user.displayName || item.user === this.state.user.email){
                                    console.log("Owner found");
                                    delButton = <button onClick={() => this.removeItem(item.id)}>Borrar</button>;
                                    editButton = <button onClick={() => this.updateItem(item.id, item)}>Editar</button>;
                                }else{
                                    console.log("Owner not found");
                                }
                              return (
                                <li key={item.id}>
                                    <span><Switch isChecked={false} itemIdSw={item.id} onPress={this.returnToStudy} /></span>
                                    <h3>{item.title}</h3>
                                    <p><strong>Celular:</strong> {item.cel}</p>
                                    <p><strong>Dirección:</strong> {item.dir}</p>
                                    <p><strong>Barrio:</strong> {item.barrio}</p>
                                    <p><strong>Descripción:</strong> {item.des}</p>
                                    <p><strong>Fecha de regreso:</strong> {item.dateBack}</p>
                                    <p><strong>Fecha de registro:</strong> {item.dateInit}</p>
                                    <p><strong>Agregado por:</strong> {item.user}</p>
                                    <p>
                                        {delButton}
                                        {editButton}
                                        {/*{item.user === this.state.user.displayName || item.user === this.state.user.email ?
                                       <button onClick={() => this.removeItem(item.id)}>Remove Item</button> : null}*/}
                                    </p>
                                </li>
                              )
                            })}
                          </ul>
                        </div>
                      </section>
                </div>
                </div>