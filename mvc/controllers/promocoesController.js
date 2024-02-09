const path = require('path')
const PromoDAO = require('../../DAO/promocoesDAO')
const DescontoDAO = require('../../DAO/descontoDAO')

module.exports = (app) => {   

   
    app.get("/promocao", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
        const desconto = new DescontoDAO()
        
        let lista_descontos = await desconto.consultarDesconto()
        console.log(lista_descontos)

        res.render('promo/addpromo', { descontos: lista_descontos })
    })

    app.get("/promocao/lista", async (req, res) => {
        res.setHeader("Access-Control-Allow-Origin","*")
    
        const promoDAO = new PromoDAO()
        const lista_promos = await promoDAO.consultarPromos()
    
        const desconto = new DescontoDAO()
        let lista_descontos = await desconto.consultarDesconto()
        
        console.log(lista_descontos)
    
        res.render('promo/listpromo', { promos: lista_promos, descontos: lista_descontos })
    })

    app.get("/promocoes", async (req, res) => {
        
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")

        res.status(201).json(await promoDAO.consultarPromos())

    })


    app.post("/registrarpromo",(req,res) =>{
        const promocaoDAO = new PromoDAO();
        res.setHeader("Acess-Control-Allow-Origin","*")
        const {txtnomepromo, dtstartpromo, dtendpromo,txtdescpromo, ativapromo, seldescpromo} = req.body;

        promocaoDAO.registrarPromo(txtnomepromo, dtstartpromo, dtendpromo,txtdescpromo, ativapromo, seldescpromo)

        res.status(201).json({ 
            msg: "ok"
        })
    })

    app.delete("/promocao/apagar/:id", async (req,res) =>{
        const promoDAO = new PromoDAO();
        res.setHeader("Access-Control-Allow-Origin","*")
    
        res.json(await promoDAO.apagarPromo(req.params.id))

    })
    app.get("/promocao/alterar/:id", async (req, res) => {

        const desconto = new DescontoDAO()
        let lista_descontos = await desconto.consultarDesconto()

        const promoDAO = new PromoDAO();
        const r = await promoDAO.consultarPromocaoId(req.params.id);
        console.log(r); // Adicione esta linha para verificar o conteúdo de r no console
        res.render("promo/uppromo", { promocao: r, descontos: lista_descontos });
        

    });
    app.put("/promocoes/alterar", async (req, res) => {
        const promocaoDAO = new PromoDAO()
        res.setHeader("Access-Control-Allow-Origin","*")

        //Destructuring
        const {nome, dt_start, dt_end, descr_promo,ativa,desconto, id } = req.body

        const r = await promocaoDAO.atualizarPromocao(id,nome, dt_start, dt_end, descr_promo,ativa,desconto)

        res.json({r})
        

    })
}

