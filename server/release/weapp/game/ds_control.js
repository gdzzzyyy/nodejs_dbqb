
class ds_control
{
    constructor()
    {
        this.running = true;
    }   

    shutdown()
    {
        this.running = false;
    }

    is_running()
    {
        return this.running;
    }
}

module.exports = new ds_control();
