Ext.define('Infosys_web.view.facturaelectronica.DteProveedorPrincipal' ,{
    extend: 'Ext.grid.Panel',
    alias : 'widget.dteproveeprincipal',
    
    requires: ['Ext.toolbar.Paging'],
    title : 'Informe Stock',
    autoHeight: false,
    store: 'Cargadteproveedores',
    autoShow: true,
    width: 700,
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
                                header: "XML Recepcion DTE",
                                xtype:'actioncolumn',
                                width:150,
                                items: [{
                                    icon: 'images/download-icon.png',  // Use a URL in the icon config
                                    tooltip: 'Ver Recepcion DTE',
                                    handler: function(grid, rowIndex, colIndex) {
                                        var rec = grid.getStore().getAt(rowIndex);
                                        var vista = this.up('dteproveeprincipal');
                                        vista.fireEvent('verxmlprovee',rec,1)
                                    }
                                }]
                                },{
                                        header: "XML Resultado DTE",
                                        xtype:'actioncolumn',
                                        width:150,
                                        items: [{
                                            icon: 'images/download-icon.png',  // Use a URL in the icon config
                                            tooltip: 'Ver Resultado DTE',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                var vista = this.up('dteproveeprincipal');
                                                vista.fireEvent('verxmlprovee',rec,2)
                                            }
                                        }]
                                },{
                                        header: "XML Envio Recibo",
                                        xtype:'actioncolumn',
                                        width:150,
                                        items: [{
                                            icon: 'images/download-icon.png',  // Use a URL in the icon config
                                            tooltip: 'Ver Envio Recibo',
                                            handler: function(grid, rowIndex, colIndex) {
                                                var rec = grid.getStore().getAt(rowIndex);
                                                var vista = this.up('dteproveeprincipal');
                                                vista.fireEvent('verxmlprovee',rec,3)
                                            }
                                        }]
                                }
                                ],
    initComponent: function() {
        me = this;
  
        var stockProductos = Ext.create('Ext.data.Store', {
            fields: ['id','razon_social','rutemisor', 'mail' , 'fecemision', 'fecenvio' , 'created_at'],
            pageSize: 7,
            autoLoad: true,
            proxy: {
              type: 'ajax',
                url : preurl +'facturas/dteproveegetAll',
                reader: {
                    type: 'json',
                    root: 'data'
                }
            },
            autoLoad: true
        });         
     

        
        this.callParent(arguments);
        this.on('render', this.loadStore, this);
    },
    loadStore: function() {
        this.getStore().load();
    }
});
