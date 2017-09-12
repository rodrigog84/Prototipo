Ext.define('Infosys_web.view.facturaelectronica.DteProveedorPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dteproveeprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Facturas Proveedores',
    //autoHeight: false,
    store: 'Cargadteproveedores',
    autoShow: true,
    width: 700,
    viewConfig: {
        forceFit: true

    },    
    //height: 200,
    columns: [
                                { text: 'id',  dataIndex: 'id', hidden: true, flex: 1},
                                { text: '#',  dataIndex: 'num', width:50},
                                { text: 'Raz&oacute;n Social',  dataIndex: 'razon_social', width:300},
                                { text: 'Rut',  dataIndex: 'rutemisor', flex: 1  },
                                { text: 'Email',  dataIndex: 'mail', width:200, align: 'left'},
                                { text: 'Fecha Documento',  dataIndex: 'fecemision', flex: 1 },
                                { text: 'Fecha Env&iacute;o',  dataIndex: 'fecenvio', flex: 1 },
                                { text: 'Fecha Lectura',  dataIndex: 'created_at', flex: 1},
                                {
                                    header: "Env&iacute;o SII",
                                    xtype:'actioncolumn',
                                    width:70,
                                    align: 'center',
                                    items: [{
                                        iconCls: 'icon-upload',  // Use a URL in the icon config
                                        tooltip: 'Ver Estado Env&iacute;o',
                                        handler: function(grid, rowIndex, colIndex) {
                                            var rec = grid.getStore().getAt(rowIndex);
                                            console.log(rec.data.id);
                                            //salert("Edit " + rec.get('firstname'));
                                        //var vista = this.up('dteproveeprincipal');
                                           // vista.fireEvent('verEstadoDte',rec,3)
                                            Ext.create('Infosys_web.view.facturaelectronica.verEstadoCompra', {idcompra: rec.data.id});   
                                        },
                                    }]     
                                
                                    },
                                {
                                header: "Recepcion DTE",
                                xtype:'actioncolumn',
                                width:100,
                                items: [{
                                    icon: 'images/download-icon.png',  // Use a URL in the icon config
                                    tooltip: 'Ver Recepcion DTE',
                                    handler: function(grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        var vista = this.up('dteproveeprincipal');
                                        vista.fireEvent('verxmlprovee',rec,1)
                                    },
                                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                            // Returns true if 'editable' is false (, null, or undefined)
                                            if(record.get('procesado') == 'N'){
                                             return true;
                                            }else{
                                             return false;
                                            }
                                        }                                     
                                }]
                                },{
                                        header: "Resultado DTE",
                                        xtype:'actioncolumn',
                                        width:100,
                                        items: [{
                                            icon: 'images/download-icon.png',  // Use a URL in the icon config
                                            tooltip: 'Ver Resultado DTE',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                var vista = this.up('dteproveeprincipal');
                                                vista.fireEvent('verxmlprovee',rec,2)
                                            },
                                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                            // Returns true if 'editable' is false (, null, or undefined)
                                            if(record.get('procesado') == 'N'){
                                             return true;
                                            }else{
                                             return false;
                                            }
                                        }
                                        }]
                                },{
                                        header: "Envio Recibo",
                                        xtype:'actioncolumn',
                                        width:100,
                                        items: [{
                                            icon: 'images/download-icon.png',  // Use a URL in the icon config
                                            tooltip: 'Ver Envio Recibo',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                var vista = this.up('dteproveeprincipal');
                                                vista.fireEvent('verxmlprovee',rec,3)
                                            },
                                        isDisabled: function(view, rowIndex, colIndex, item, record) {
                                                            // Returns true if 'editable' is false (, null, or undefined)
                                            if(record.get('procesado') == 'N'){
                                             return true;
                                            }else{
                                             return false;
                                            }
                                        }
                                        }]
                                }

                                ],
    initComponent: function() {
        me = this;
  
 this.dockedItems = [{
     xtype: 'pagingtoolbar',
            dock:'bottom',
            store: 'Cargadteproveedores',
            displayInfo: true
        }];
        
        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }
});
